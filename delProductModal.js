export default {
  template: `<div
    id="delProductModal"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="delProductModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delProductModalLabel" class="modal-title">
            <span>刪除遛噠星人</span>
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger">{{ tempData.title }}</strong>
          資料檔(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="delPet">
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>`,
  props: {
    tempData: {
      type: Object,
      default: () => {},
    },
    api: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    delPet() {
      const { path, uuid } = this.api;
      const api = `${path}${uuid}/admin/ec/product/${this.tempData.id}`
      axios.delete(api).then(() => {
        this.$emit('update');
      })
    }
  },
}