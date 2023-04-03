export const useAlertStore = defineStore({
  id: 'alert',
  state: () => ({
    inSubmission: false,
    showAlert: false,
    alertVariant: '',
    alertMsg: ''
  }),
  actions: {
    wait(message) {
      this.inSubmission = true;
      this.showAlert = true;
      this.alertVariant = 'wait';
      this.alertMsg = message;
    },
    success(message) {
      this.inSubmission = false;
      this.showAlert = true;
      this.alertVariant = 'pass';
      this.alertMsg = message;
    },
    error(message) {
      this.inSubmission = false;
      this.showAlert = true;
      this.alertVariant = 'danger';
      this.alertMsg = message;
    },
    clear() {
      this.inSubmission = false;
      this.showAlert = false;
      this.alertVariant = '';
      this.alertMsg = '';
    }
  }
});
