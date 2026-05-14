import { Modal } from "antd";
import { ArrowRight } from "lucide-react";

export const ConnectWalletModal = ({
  open,
  onClose,
  onConnect,
}: {
  open: boolean;
  onClose: () => void;
  onConnect: () => void;
}) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={460}
      className="[&_.ant-modal-content]:rounded-[24px] [&_.ant-modal-content]:p-8 [&_.ant-modal-container]:px-7!  [&_.ant-modal-container]:py-3!"
      title={
        <div className="text-lg font-semibold text-[#07130f]">
          Kết nối ví Admin
        </div>
      }
    >
      <div className="mt-4 flex flex-col">
        <p className="mb-6 text-[15px] leading-6 text-[#70827a]">
          Hành động on-chain (niêm yết, freeze ví, cập nhật giá Oracle) yêu cầu
          chữ ký từ ví Admin. Chọn provider:
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => {
              onConnect();
              onClose();
            }}
            className="flex w-full items-center justify-between rounded-xl border border-[#dde4df] p-4 text-left transition-colors hover:bg-[#f7f9f8]"
            type="button"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-[#f97316]"></div>
              <div>
                <div className="text-base font-bold text-[#07130f]">
                  MetaMask
                </div>
                <div className="text-sm text-[#70827a]">
                  Đã phát hiện · 1 tài khoản
                </div>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-[#81938c]" />
          </button>

          <button
            disabled
            className="flex w-full items-center justify-between rounded-xl border border-[#dde4df] p-4 text-left opacity-60"
            type="button"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-[#93c5fd] text-xl font-bold text-white">
                W
              </div>
              <div>
                <div className="text-base font-bold text-[#70827a]">
                  WalletConnect
                </div>
                <div className="text-sm text-[#a3b1ab]">
                  Không khả dụng trong PoC
                </div>
              </div>
            </div>
          </button>
        </div>

        <div className="mt-6 rounded-xl bg-[#fff7ed] p-4 text-[13px] leading-5 text-[#c2410c]">
          <span className="font-bold">Lưu ý PoC:</span> Production sẽ yêu cầu
          hardware wallet (Ledger/Trezor) cho ví Admin.
        </div>
      </div>
    </Modal>
  );
};
