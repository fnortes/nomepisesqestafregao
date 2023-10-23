import { useEffect, useState } from "react";

import { Button } from "../ui/button";
import Modal from "../ui/modal";

interface Props {
  isOpen: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function AlertModal({
  isOpen,
  loading,
  onClose,
  onConfirm,
}: Props) {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="¿Estás seguro?"
      description="Esta acción ya no se podrá deshacer"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          Continuar
        </Button>
      </div>
    </Modal>
  );
}
