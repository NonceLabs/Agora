const IP = 'localhost'

export const SIP = `http://${IP}:3000/`
export const WSIP = `ws://${IP}:3001`
export const AVATAR = `${SIP}images/avatar.png`
export const EULA = `${SIP}EULA.txt`

export const IMAGER_OPTION = {
  title: '选择照片',
  cancelButtonTitle: '算了吧',
  takePhotoButtonTitle:'拍照',
  chooseFromLibraryButtonTitle:'相册',
  mediaType: 'photo',
  cameraType: 'front',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  },
  noData: true
};
