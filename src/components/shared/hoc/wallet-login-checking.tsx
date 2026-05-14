import { paths } from "@/routes/paths";
import { type ComponentType, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";

export function withWalletLoginChecking<P extends object>(
  WrappedComponent: ComponentType<P>,
) {
  return function WithWalletLoginChecking(props: P) {
    const { isConnected } = useAccount();
    const navigate = useNavigate();

    useEffect(() => {
      if (!isConnected) {
        navigate(paths.listedProperty, { replace: true });
      }
    }, [isConnected, navigate]);

    if (!isConnected) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
