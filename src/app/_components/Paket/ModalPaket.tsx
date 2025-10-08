import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import { PaketType } from "../../../../utils/paketData";

interface PropTypes {
  paket: PaketType;
  isOpen: boolean;
  onClose: () => void;
}
const ModalPaket = (props: PropTypes) => {
  const { isOpen, onClose, paket } = props;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const nowa = formData.get("nowa") as string;
    const usaha = formData.get("usaha") as string;
    const businessType = formData.get("businessType") as string;
    const message = formData.get("message") as string;

    const text = `Halo! Saya tertarik dengan paket *${paket.title}*.\n\nNama: ${name}\nNo. WhatsApp: ${nowa}\nNama Usaha: ${usaha}\nJenis Usaha: ${businessType}\nDeskripsi proyek:\n${message}`;
    const url = `https://wa.me/6287718517731?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    onClose();
  };
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} size="5xl">
        <ModalContent className="max-h-[90vh] md:max-h-full">
          <ModalHeader className="flex flex-col gap-1">
            {paket.title}
          </ModalHeader>
          <ModalBody className="flex flex-col md:flex-row gap-4 px-4 md:px-6 overflow-auto">
            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="flex-1 flex flex-col gap-3 p-4 md:p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl order-1 md:order-2"
            >
              <Input
                name="name"
                type="text"
                required
                labelPlacement="outside"
                label="Nama lengkap"
                variant="bordered"
                className="w-full rounded-xl"
              />
              <Input
                name="nowa"
                type="number"
                required
                labelPlacement="outside"
                label="No. WhatsApp"
                variant="bordered"
                className="w-full rounded-xl"
              />
              <Input
                name="usaha"
                type="text"
                required
                labelPlacement="outside"
                label="Nama Usaha/Perusahaan"
                variant="bordered"
                className="w-full rounded-xl"
              />
              <Select
                name="businessType"
                required
                variant="bordered"
                labelPlacement="outside"
                label="Pilih jenis usaha"
                className="w-full rounded-xl"
              >
                <SelectItem key="Toko Online">Toko Online</SelectItem>
                <SelectItem key="Toko Offline">Toko Offline</SelectItem>
                <SelectItem key="UMKM">UMKM</SelectItem>
                <SelectItem key="Jasa">Jasa</SelectItem>
                <SelectItem key="Lainnya">Lainnya</SelectItem>
              </Select>
              <Textarea
                name="message"
                labelPlacement="outside"
                required
                rows={4}
                label="Ceritakan proyekmu..."
                variant="bordered"
                className="w-full rounded-xl"
              />

              <ModalFooter className="flex flex-col md:flex-row justify-end gap-3 pt-2">
                <Button
                  variant="flat"
                  color="success"
                  onPress={onClose}
                  className="rounded-xl px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition w-full md:w-auto"
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  variant="solid"
                  color="success"
                  className="rounded-xl px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 hover:scale-105 transition-transform duration-200 w-full md:w-auto"
                >
                  Kirim via WhatsApp
                </Button>
              </ModalFooter>
            </form>

            {/* PANEL PAKET */}
            <div className="flex-1 bg-gradient-to-br from-green-600 to-cyan-500 text-white p-4 md:p-6 rounded-xl flex flex-col justify-center order-2 md:order-1">
              {paket.price && (
                <div className="mb-4">
                  {paket.oldPrice && (
                    <span className="line-through mr-2 text-lg text-gray-200">
                      Rp {paket.oldPrice}
                    </span>
                  )}
                  <span className="text-2xl md:text-3xl font-bold drop-shadow-sm">
                    Rp {paket.price}
                  </span>
                </div>
              )}
              <p className="mb-4 text-sm md:text-base">{paket.description}</p>
              <ul className="space-y-1 md:space-y-2 text-sm md:text-base">
                {paket.features.map((f, i) => (
                  <li key={i} className="flex items-center">
                    <span className="mr-2 text-green-300">✔</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ModalPaket;
