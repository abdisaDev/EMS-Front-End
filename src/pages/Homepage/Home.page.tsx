import { faBell } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import QR from "../../assets/QR_code.png";

function Homepage() {
  return (
    <div className="flex justify-center items-center w-full bg-gray-200 h-[100vh]">
      <div className="relative bg-white w-[500px] h-[700px] flex flex-col">
        <div className="absolute w-fit h-fit right-0 mt-5 mr-6">
          <FontAwesomeIcon icon={faBell} className="text-[28px]" />
        </div>
        <h2 className="mt-20 mx-auto w-fit text-[25px] font-medium tracking-wide">
          Welcome User
        </h2>
        {/* QR image */}
        <div className="mx-auto w-fit pt-10">
          <img src={QR} alt="QR_code" className="w-[400px]" />
        </div>
        <button className="w-fit mx-auto border px-14 py-2 rounded-lg bg-black text-white font-medium">
          Add item
        </button>
      </div>
    </div>
  );
}

export default Homepage;
