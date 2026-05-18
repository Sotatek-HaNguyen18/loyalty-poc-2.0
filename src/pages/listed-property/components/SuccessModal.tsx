import { paths } from "@/routes/paths";
import { Button, Modal } from "antd";
import { Check, Link as LinkIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const SuccessModal = ({
  open,
  onClose,
  onReset,
  listingId = "CC-2026-002",
}: {
  open: boolean;
  onReset: () => void;
  onClose: () => void;
  listingId?: string;
}) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success">("loading");

  const handleNavigate = () => {
    onReset();
    onClose();
    navigate(paths.listedProperty);
  };

  useEffect(() => {
    if (open) {
      setStatus("loading");
      const timer = setTimeout(() => {
        setStatus("success");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      closeIcon={null}
      width={460}
      className="[&_.ant-modal-content]:rounded-[24px] [&_.ant-modal-content]:p-8"
    >
      {status === "loading" ? (
        <div className="flex flex-col items-center text-center py-8 px-7">
          <div className="relative mt-2 flex h-[100px] w-[100px] items-center justify-center rounded-full border-[3px] border-border-soft">
            <div className="absolute inset-[-3px] animate-spin rounded-full border-[3px] border-transparent border-r-bidv-green border-t-bidv-green" />
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-border-soft">
              <LinkIcon className="h-5 w-5 -rotate-45 text-bidv-green" />
            </div>
          </div>
          <h3 className="mt-8 text-[22px] font-bold text-text">
            Đang chờ block confirmation
          </h3>
          <p className="mt-2 text-[15px] text-muted-text">
            Tx Hash: 0x3c81c2954440f9
          </p>
          <div className="mt-8 mb-2 flex items-center justify-center gap-3 text-[13px] font-semibold text-text-3">
            <div className="flex items-center gap-1.5 text-bidv-green">
              <Check className="h-4 w-4" />
              Ký giao dịch
            </div>
            <span className="text-border-strong">·</span>
            <div className="flex items-center gap-1.5 text-bidv-green">
              <div className="h-2 w-2 rounded-full bg-text-3" />
              Đợi confirmation
            </div>
            <span className="text-border-strong">·</span>
            <div className="flex items-center gap-1.5 font-medium text-text-3">
              Hoàn thành
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center py-8 px-7">
          <div className="mt-2 flex h-[84px] w-[84px] items-center justify-center rounded-full bg-success-bg text-success">
            <Check className="h-8 w-8" strokeWidth={3} />
          </div>
          <h3 className="mt-6 text-[22px] font-bold text-text">
            Niêm yết thành công
          </h3>
          <p className="mt-2 text-[15px] leading-6 text-muted-text">
            Tài sản đã được tạo trên blockchain và xuất hiện trong Catalog của
            nhà đầu tư.
          </p>

          <div className="mt-8 w-full rounded-[16px] bg-bg-alt p-5 text-left">
            <div className="flex items-center justify-between py-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-text-3">
                Mã tài sản
              </span>
              <span className="text-sm font-bold text-text">{listingId}</span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-text-3">
                Tx Hash
              </span>
              <span className="font-mono text-sm text-text-2">
                0x3c81c2954440f9
              </span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-text-3">
                Block
              </span>
              <span className="font-mono text-sm text-text-2">#5,284,731</span>
            </div>
          </div>

          <div className="mt-8 flex w-full gap-4">
            <Button
              className="!h-12 flex-1 !rounded-xl !border-app-border !text-[15px] !font-semibold text-text hover:!bg-bg-alt"
              icon={<LinkIcon className="h-[18px] w-[18px] -rotate-45" />}
              onClick={onClose}
            >
              Xem trên Explorer
            </Button>
            <Button
              className="!h-12 flex-1 !rounded-xl !border-0 !bg-bidv-green !text-[15px] !font-semibold !text-white hover:!bg-bidv-green/90"
              onClick={handleNavigate}
            >
              Về danh sách niêm yết
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};
