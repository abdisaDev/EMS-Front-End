import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputField from "../../component/inputField/inputField.component";
import { faBoxesStacked } from "@fortawesome/free-solid-svg-icons";

function Signup() {
  return (
    <div className="flex justify-center items-center w-full bg-gray-200 h-[100vh]">
      <div className="relative bg-white w-[500px] h-[700px] flex items-center flex-col pt-10">
        <h2 className="font-medium text-[25px] mb-6">Sign up</h2>
        <form action="" className="w-fit flex flex-col gap-5">
          <div className="mb-3 flex gap-3">
            <InputField type="text" placeholder="First name" />
            <InputField type="text" placeholder="Last name" />
          </div>
          <div className="flex justify-between">
            <select
              name=""
              id=""
              className="w-[200px] text-gray-400 h-[40px] rounded-lg pl-4 bg-white shadow-xl"
            >
              <option value="">Role</option>
              <option value="">Student</option>
              <option value="">Guard</option>
            </select>
            <button className="w-[130px] rounded-lg shadow-xl flex items-center gap-2 justify-center">
              <FontAwesomeIcon icon={faBoxesStacked} />
              Items
            </button>
          </div>
          <div className="flex justify-between">
            <InputField
              type="text"
              placeholder="Phone number"
              style={{ width: "260px" }}
            />
            <button className="w-[150px] shadow-xl rounded-xl">Get code</button>
          </div>
          <InputField type="password" placeholder="Password" />
          <InputField type="password" placeholder="Confirm password" />
          <button className="w-fit mx-auto px-14 rounded-xl font-medium text-white bg-black py-2 shadow-xl mt-7">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
