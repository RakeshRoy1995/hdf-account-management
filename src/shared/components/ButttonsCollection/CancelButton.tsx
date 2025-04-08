import { useTranslation } from "react-i18next";

const CancelButton = ({ setsingleData, setaddFormShow }: any) => {
  const { t } = useTranslation();

  const formReset = () => {
    const form: any = document.querySelector("form");
    if (form) {
      form.reset();
      
    }

    if (setsingleData) {
      setsingleData(null);
    }

    if (setaddFormShow) {
      setaddFormShow(false)
    }
  };
  return (
    <div>
      <div className="flex justify-end mt-5">
          <button
            type="button"
            onClick={(e: any) => formReset()}
            className="bg-tertiaryColor font-bold text-sm text-white rounded-lg px-4 py-3 flex justify-center items-center gap-1"
          >
            {t("cancel")}
          </button>
      </div>
    </div>
  );
};

export default CancelButton;
