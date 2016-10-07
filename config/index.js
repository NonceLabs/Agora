
export const SIP = 'http://120.76.251.99:3000/'
export const WSIP = 'ws://120.76.251.99:3001'
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
