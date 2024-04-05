import {getDownloadURL, ref as storageRef, UploadMetadata} from "@firebase/storage";
import {getNewFileName} from "~/service/firebase/fire-storage-service";
import {AlbumType} from "~/types";

export default function () {
    const firebaseStorage = useFirebaseStorage()
    const {notifyByError, showErrorToaster} = useNotifyUser()
    const {reloadUserProfile} = useAppGlobals()
    const {saveUserProfile, getUserProfile} = useUserProfileCollection()
    const {getOrAddAlbum} = useAlbumCollection()
    const {saveAlbumImage} = useAlbumImageCollection()

    const uploadingFile = ref(false)
    // const fileForUpload = ref(null as File)
    const authStore = useAuthStore()

    const uploadFileToFirebaseStorage = (albumType: AlbumType, parentPath: string, file: File) => {
        console.log('>>> uploadFileToFirebaseStorage albumType:', albumType)
        const filePath = `${parentPath}${getNewFileName(file.name)}`
        const fileUploadRef = storageRef(firebaseStorage, filePath)
        const {uploadTask, upload} = useStorageFile(fileUploadRef)

        uploadingFile.value = true

        const imageMeta: UploadMetadata = {
            contentType: file.type,
            cacheControl: 'max-age=31536000, immutable',
            customMetadata: {
                userId: authStore.authUser.userId,
                albumType,
            }
        }
        upload(file, imageMeta)
            .catch(notifyByError)

        if (!uploadTask.value) {
            uploadingFile.value = false
            return
        }

        uploadTask.value.on('state_changed', (snapshot) => {
                switch (snapshot.state) {
                    case 'running':
                        break
                    case 'success':
                        break
                    default:
                        showErrorToaster({key: 'notification.photoUploadFailed'})
                }
            },
            reason => {
                uploadingFile.value = false
                notifyByError(reason)
            },
            () => {
                getDownloadURL(uploadTask.value.snapshot.ref)
                    .then(async (downloadURL) => {
                        const album = await getOrAddAlbum(authStore.authUser.userId, albumType)
                        console.log('>>>> Found album: ', album, 'albumType: ', albumType)
                        const savedAlbumImage = await saveAlbumImage({
                            albumId: album.id,
                            image: {
                                path: filePath,
                                src: downloadURL,
                            }
                        })
                        await getUserProfile(authStore.authUser.userId)
                            .then(async (profile) => {
                                if (albumType === AlbumType.PROFILE) {
                                    profile.profilePhoto = savedAlbumImage
                                } else if (albumType === AlbumType.COVER) {
                                    profile.coverPhoto = savedAlbumImage
                                }
                                await saveUserProfile(profile)
                                    .then(async (savedProfile) => {
                                        // userProfile.value = savedProfile
                                        await reloadUserProfile()
                                    })
                            })
                    })
                    .catch(notifyByError)
                    .finally(() => {
                        uploadingFile.value = false
                    });
            }
        )
    }

    const uploadSinglePhoto = (albumType: AlbumType, photo: File) => {
        if (!albumType || !photo) {
            console.log('>>>>> Cannot be uploaded')
        }

        console.log(`>>>>> Uploading ${albumType}:`, photo.name)
        switch (albumType) {
            case AlbumType.PROFILE:
                return uploadFileToFirebaseStorage(albumType, `users/${authStore.authUser.userId}/profilePhotos/`, photo)
            case AlbumType.COVER:
                return uploadFileToFirebaseStorage(albumType, `users/${authStore.authUser.userId}/coverPhotos/`, photo)
            case AlbumType.CUSTOM:
            default:
                console.log('>>>>> Unknown albumType: ', albumType)
        }
    }

    return {
        uploadingFile,
        uploadSinglePhoto
    }
}