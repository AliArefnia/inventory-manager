import BaseButton from "./BaseButton";
import BaseModal from "./BaseModal";
type YesNoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  handleYes: () => void;
  disabled?: boolean;
};

function BaseYesNoModule({
  isOpen,
  onClose,
  disabled,
  handleYes,
  children,
}: YesNoModalProps) {
  return (
    <div>
      <BaseModal isOpen={isOpen} onClose={onClose}>
        {children}
        <div className="flex justify-center gap-4 mt-6">
          <BaseButton
            disabled={disabled}
            onClick={() => handleYes()}
            className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded"
          >
            {disabled ? "Deleting..." : "Yes"}
          </BaseButton>
          <BaseButton
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded dark:bg-gray-600 dark:text-white"
          >
            No
          </BaseButton>
        </div>
      </BaseModal>
    </div>
  );
}

export default BaseYesNoModule;
