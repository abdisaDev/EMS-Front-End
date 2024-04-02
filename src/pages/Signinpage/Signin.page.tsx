import InputField from "../../component/inputField/inputField.component";

function Signin() {
  return (
    <div className="flex justify-center items-center w-full bg-gray-200 h-[100vh]">
      <div className="relative gap-5 bg-white w-[500px] h-[700px] flex flex-col items-center">
        <h2 className="text-[25px] font-medium mt-16">Sign in</h2>
        <InputField
          type="text"
          placeholder="Phone number"
          style={{
            width: "70%",
          }}
        />
        <InputField
          type="password"
          placeholder="Password"
          style={{
            width: "70%",
          }}
        />
        <button className="w-fit mx-auto border px-14 py-2 mt-7 rounded-lg bg-black text-white font-medium">
          Login
        </button>
      </div>
    </div>
  );
}

export default Signin;
