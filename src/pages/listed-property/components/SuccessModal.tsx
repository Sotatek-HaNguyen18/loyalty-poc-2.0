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
          <div className="relative mt-2 flex h-[100px] w-[100px] items-center justify-center rounded-full border-[3px] border-[#e8edeb]">
            <div className="absolute inset-[-3px] animate-spin rounded-full border-[3px] border-transparent border-r-[#004225] border-t-[#004225]"></div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e8edeb]">
              <LinkIcon className="h-5 w-5 -rotate-45 text-[#004225]" />
            </div>
          </div>
          <h3 className="mt-8 text-[22px] font-bold text-[#07130f]">
            Đang chờ block confirmation
          </h3>
          <p className="mt-2 text-[15px] text-[#70827a]">
            Tx Hash: 0x3c81c2954440f9
          </p>
          <div className="mt-8 mb-2 flex items-center justify-center gap-3 text-[13px] font-semibold text-[#81938c]">
            <div className="flex items-center gap-1.5 text-[#004225]">
              <Check className="h-4 w-4" />
              Ký giao dịch
            </div>
            <span className="text-[#dde4df]">·</span>
            <div className="flex items-center gap-1.5 text-[#004225]">
              <div className="h-2 w-2 rounded-full bg-[#81938c]" />
              Đợi confirmation
            </div>
            <span className="text-[#dde4df]">·</span>
            <div className="flex items-center gap-1.5 font-medium text-[#81938c]">
              Hoàn thành
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center py-8 px-7">
          <div className="mt-2 flex h-[84px] w-[84px] items-center justify-center rounded-full bg-[#e8f5ed] text-[#008a4e]">
            <Check className="h-8 w-8" strokeWidth={3} />
          </div>
          <h3 className="mt-6 text-[22px] font-bold text-[#07130f]">
            Niêm yết thành công
          </h3>
          <p className="mt-2 text-[15px] leading-6 text-[#70827a]">
            Tài sản đã được tạo trên blockchain và xuất hiện trong Catalog của
            nhà đầu tư.
          </p>

          <div className="mt-8 w-full rounded-[16px] bg-[#f7f9f8] p-5 text-left">
            <div className="flex items-center justify-between py-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#81938c]">
                Mã tài sản
              </span>
              <span className="text-sm font-bold text-[#07130f]">
                {listingId}
              </span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#81938c]">
                Tx Hash
              </span>
              <span className="font-mono text-sm text-[#53635c]">
                0x3c81c2954440f9
              </span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#81938c]">
                Block
              </span>
              <span className="font-mono text-sm text-[#53635c]">
                #5,284,731
              </span>
            </div>
          </div>

          <div className="mt-8 flex w-full gap-4">
            <Button
              className="!h-12 flex-1 !rounded-xl !border-[#dde4df] !text-[15px] !font-semibold text-[#16211d] hover:!bg-gray-50"
              icon={<LinkIcon className="h-[18px] w-[18px] -rotate-45" />}
              onClick={onClose}
            >
              Xem trên Explorer
            </Button>
            <Button
              className="!h-12 flex-1 !rounded-xl !border-0 !bg-[#004225] !text-[15px] !font-semibold !text-white hover:!bg-[#004225]/90"
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
