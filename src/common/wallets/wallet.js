export default class Wallet {

  /**
   * @return (error,result) {error:{errorCode:,message:''},result:'en'}
   */
  getLanguage() {
    throw new Error('unimplemented')
  }

  /**
   * @return(error,result) {error:{errorCode:,message:''},result:'RMB'}
   */
  getCurrency() {
    throw new Error('unimplemented')
  }

  /**
   * @return (error,result) {error:{errorCode:,message:''},result:0.0002}
   */
  getLrcFee() {
    throw new Error('unimplemented')
  }

  /**
   * @@return (error,result) {error:{errorCode:,message:''},result:'0x00000000'}
   */
  getCurrentAccount() {
    throw new Error('unimplemented')
  }

  /**
   * @param message
   * @return (error,result) {error:{errorCode:,message:''},result:{r:'0x',s:'0x',v:27}}
   */
  signMessage(message) {
    throw new Error('unimplemented')
  }

  /**
   *
   * @param tx rawTx
   * @return (error,result) {error:{errorCode:,message:''},result:'0x112121212'}
   */

  signTx(tx) {
    throw new Error('unimplemented')
  }
}
