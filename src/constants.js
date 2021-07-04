export const actionTypes = {
  SET_TRANSACTION_DATA: 'SET_TRANSACTION_DATA',
  SET_DEVICE_REGISTERED: 'SET_DEVICE_REGISTERED',
  SET_PIN_CODE: 'SET_PIN_CODE',
  ADD_USER_ACCOUNT: 'ADD_USER_ACCOUNT',
  SET_USER_ACCOUNTS: 'SET_USER_ACCOUNTS'
}

export const errors = {
  WRONG_PIN: 'Error! Your pin number does not match. Please try again',
  SCAN_ERROR: 'Error! No scan detected. Please scan again.',
  REGISTRATION_ERROR: 'Error! Please register the device first.',
  INVALID_TRANSACTION: 'Cannot validate transaction',
  INVALID_QRCODE: 'Cannot read information from the qr code',
  EXISTING_USER: 'User is already registered',
  WRONG_SCAN_USER: 'This is user registration QR code and not transaction',
  WRONG_SCAN_TRANSACTION: 'This is transaction QR code and not user registration'
}

export const ui = {
  empty: 'empty'
}

export const digits = ['1','2','3','4','5','6','7','8','9',ui.empty,'0']
