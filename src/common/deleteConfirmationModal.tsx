import Button from "./button";

interface ConfirmationModalProps {
  showModal: boolean;
  onClose: () => void;
  onConfirm: (id: string) => void;
  itemId: string | null;
  isLoading?: boolean;
  message: string;
}

const DeleteConfirmationModal: React.FC<ConfirmationModalProps> = ({
  showModal,
  onClose,
  onConfirm,
  itemId,
  isLoading,
  message
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-30">
      <div className="bg-white p-6 rounded shadow-lg mx-4 md:mx-auto w-full md:w-auto">
        <h3 className="text-xl mb-4">
          {message}
        </h3>
        <div className="flex justify-end space-x-2">
          <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200" onClick={onClose}>
            Cancel
          </button>
          <Button
            type="button"
            isLoading={isLoading}
            onClick={() => itemId && onConfirm(itemId)}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
