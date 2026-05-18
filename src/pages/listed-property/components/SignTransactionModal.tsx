import { Modal, Button } from "antd";

type SignTransactionModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  methodName: string;
};

export const SignTransactionModal = ({
  open,
  onClose,
  onConfirm,
  methodName,
}: SignTransactionModalProps) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      closeIcon={null}
      width={400}
      className="[&_.ant-modal-content]:overflow-hidden [&_.ant-modal-content]:rounded-[16px] [&_.ant-modal-content]:p-0"
    >
      <div className="flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-app-border px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-[4px] bg-wallet-metamask" />
            <span className="text-sm font-bold text-text">MetaMask</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-success" />
            <span className="text-sm text-text-2">Polygon Mumbai</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col px-6 py-6">
          <div className="text-center">
            <div className="text-xs font-semibold uppercase tracking-widest text-text-2">
              YÊU CẦU KÝ GIAO DỊCH
            </div>
            <h3 className="mt-2 text-lg font-bold text-text">
              BIDV RWA Admin Console
            </h3>
            <div className="mt-1 text-sm text-text-2">admin.bidv.local</div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            {/* Account */}
            <div className="rounded-xl bg-bg-alt p-4">
              <div className="text-[11px] font-bold uppercase tracking-wider text-text-2">
                TÀI KHOẢN
              </div>
              <div className="mt-3 flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-wallet-metamask-alt" />
                <div>
                  <div className="text-sm font-bold text-text">
                    BIDV Admin · Vàng
                  </div>
                  <div className="text-xs text-text-2">0xA82C...7e91</div>
                </div>
              </div>
            </div>

            {/* Contract */}
            <div className="rounded-xl bg-bg-alt p-4">
              <div className="text-[11px] font-bold uppercase tracking-wider text-text-2">
                TƯƠNG TÁC HỢP ĐỒNG
              </div>
              <div className="mt-2 text-sm font-bold text-text">
                AssetRegistry
              </div>
              <div className="text-xs text-text-2">0x9b3f...02ad</div>
              <div className="mt-3 inline-block rounded-md bg-accent-purple-bg px-2 py-1 font-mono text-[11px] font-medium text-accent-purple">
                {methodName}
              </div>
            </div>

            {/* Gas */}
            <div className="flex items-center justify-between rounded-xl bg-bg-alt p-4">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-text-2">
                  PHÍ GAS ƯỚC TÍNH
                </div>
                <div className="mt-1 text-sm font-bold text-text">
                  ≈ 0.0023 MATIC
                </div>
                <div className="mt-0.5 text-xs text-text-2">
                  ~$0.0012 - 30 gwei
                </div>
              </div>
              <div className="text-right">
                <div className="text-[11px] font-bold uppercase tracking-wider text-text-2">
                  TỐC ĐỘ
                </div>
                <div className="mt-1 text-sm font-bold text-text">
                  Trung bình
                </div>
                <div className="mt-0.5 text-xs text-text-2">~6 giây</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 pb-6">
          <Button
            className="!h-12 flex-1 !rounded-full !border-app-border !font-bold text-text hover:!bg-bg-alt"
            onClick={onClose}
          >
            Hủy
          </Button>
          <Button
            className="!h-12 flex-1 !rounded-full !border-action-primary !bg-action-primary !font-bold !text-white hover:!bg-action-primary-hover"
            onClick={onConfirm}
          >
            Xác nhận
          </Button>
        </div>
      </div>
    </Modal>
  );
};
