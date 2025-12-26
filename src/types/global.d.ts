interface Window {
  _AMapSecurityConfig: {
    securityJsCode: string
  }
}

type QCType = {
  Login: {
    check: () => boolean
    getMe: (callback: (openId: string) => void) => void
  }
}

declare const QC: QCType
