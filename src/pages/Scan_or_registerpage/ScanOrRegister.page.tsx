function ScanOrRegister() {
  return (
    <div className="flex justify-center items-center w-full bg-gray-200 h-[100vh]">
      <div className="relative bg-white w-[500px] h-[700px] flex flex-col">
        <button className="px-24 border w-fit py-6 shadow-lg rounded-xl mt-14 text-[18px] font-medium mx-auto">
          Scan
        </button>
        <button className="px-24 text-[18px] font-medium w-fit py-6 shadow-lg rounded-xl mt-7 border mx-auto">
          Register user
        </button>
      </div>
    </div>
  );
}

export default ScanOrRegister;
