import PROFILE from "../../assets/profile-img.jpg";

function Profilepage() {
  return (
    <div className="flex justify-center items-center w-full bg-gray-200 h-[100vh]">
      <div className="relative bg-white w-[500px] h-[700px] flex flex-col">
        <div className="flex w-fit gap-5 mt-6 ml-8">
          <div className="w-fit">
            <img
              src={PROFILE}
              alt="profile_image"
              className="w-[200px] rounded-lg object-cover"
            />
          </div>
          <div>
            <h2 className="text-[19px] font-medium">first name</h2>
            <h2>Role</h2>
            <h2>Gender</h2>
          </div>
        </div>
        <div className="w-[85%] h-[400px] bg-gray-200 rounded-lg mx-auto mt-5">
          <p className="text-[20px] text-gray-500 w-fit mx-auto mt-10 border">
            Items
          </p>
        </div>
        <button className="w-fit mx-auto bg-black text-white font-medium px-8 rounded-lg py-2 mt-8">
          Add item
        </button>
      </div>
    </div>
  );
}

export default Profilepage;
