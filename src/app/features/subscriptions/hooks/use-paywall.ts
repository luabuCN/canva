import { useSubscriptModal } from "../store/use-subscript-modal";

export const usePaywall = () => {
  const subscriptionModal = useSubscriptModal();
  const shouldBlock = true;
  return {
    isLoading: false,
    shouldBlock,
    triggerPaywall: () => {
      subscriptionModal.onOpen();
    },
  };
};
