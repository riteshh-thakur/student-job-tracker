import React, { useState } from "react";
import profileImg from "@/assets/images/dummy-profile-img-1.jpg";
import profileImgBg from "@/assets/images/userProfileBg.png";
import { useSelector } from "react-redux";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaRegUserCircle } from "react-icons/fa";
import { CiRepeat } from "react-icons/ci";
import { FaRegFileAlt } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import EditProfile from "@/components/editProfile";
import SettingNotification from "@/components/settingNotification";
const Profile = () => {
  const user = useSelector((state) => state?.auth?.user);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [newPasswordShow, setNewPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
  return (
    <div className="w-full px-4 pb-8 ">
      <h1 className="text-lg font-medium">View Profile</h1>
      <div className="flex w-full gap-[20px] my-4">
        <div className="w-4/12 h-min flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg border overflow-hidden">
          <img src={profileImgBg} alt="" className="w-full h-[120px]" />
          <div className="w-[150px] h-[150px] mt-[-80px] rounded-full p-1 bg-white">
            <img
              src={profileImg}
              alt=""
              className="w-full h-full rounded-full"
            />
          </div>
          <h1 className="text-xl font-medium mt-4">
            {user?.username || "Hibbanur Rahman"}
          </h1>
          <p className="text-base text-gray-600 mb-4">
            {user?.email || "hibbanrahmanhyt@gmail.com"}
          </p>
          <div className="w-full p-3 px-6 pb-6 border border-s-0 border-e-0 border-b-0">
            <h1 className="text-xl font-medium">Personal Info</h1>
            <div className="flex w-full gap-[10px] my-2">
              <div className="w-3/12">
                <p className="font-medium">Full Name</p>
              </div>
              <div className="w-9/12">
                <p className="text-gray-600">
                  : {user?.username || "Hibbanur Rahman"}
                </p>
              </div>
            </div>
            <div className="flex w-full gap-[10px] my-2">
              <div className="w-3/12">
                <p className="font-medium">Email</p>
              </div>
              <div className="w-9/12">
                <p className="text-gray-600">
                  : {user?.email || "hibbanrahmanhyt@gmail.com"}
                </p>
              </div>
            </div>
            <div className="flex w-full gap-[10px] my-2">
              <div className="w-3/12">
                <p className="font-medium">Phone Number</p>
              </div>
              <div className="w-9/12">
                <p className="text-gray-600">
                  : {user?.mobile || "+91-9973152523"}
                </p>
              </div>
            </div>
            <div className="flex w-full gap-[10px] my-2">
              <div className="w-3/12">
                <p className="font-medium">Role</p>
              </div>
              <div className="w-9/12">
                <p className="text-gray-600">: {user?.role || "Pharmacy"}</p>
              </div>
            </div>
            <div className="flex w-full gap-[10px] my-2">
              <div className="w-3/12">
                <p className="font-medium">Location</p>
              </div>
              <div className="w-9/12">
                <p className="text-gray-600">
                  :{" "}
                  {user?.location || "Gachibowli, Hyderabad, Telangana, 500032"}
                </p>
              </div>
            </div>
            <div className="flex w-full gap-[10px] my-2">
              <div className="w-3/12">
                <p className="font-medium">Languages</p>
              </div>
              <div className="w-9/12">
                <p className="text-gray-600">
                  : {user?.launguages || "English, Hindi, Bhojpuri"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-8/12 bg-white rounded-2xl shadow-lg border p-5">
          <Tabs defaultValue="editProfile" className="w-full">
            <TabsList>
              <TabsTrigger value="editProfile" className="flex gap-[5px]">
                <FaRegUserCircle />
                <p>editProfile</p>
              </TabsTrigger>
              <TabsTrigger value="changePassword" className="flex gap-[5px]">
                <CiRepeat />
                <p>changePassword</p>
              </TabsTrigger>
              <TabsTrigger value="notification" className="flex gap-[5px]">
                <FaRegFileAlt />
                <p>notification</p>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="editProfile" className="w-full">
              <EditProfile />
            </TabsContent>
            <TabsContent value="changePassword">
              <div className="w-full  my-3">
                <div className="w-full my-2 relative">
                  <label htmlFor="newPassword" className="block font-medium">
                    New Password
                  </label>
                  <input
                    type={newPasswordShow ? "text" : "password"}
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="border w-full rounded-xl mt-3 p-2 px-4 focus:outline-none focus:border-1 focus:border-blue-600 placeholder:text-gray-800 "
                    placeholder="Enter Full Name"
                    required
                  />
                  {newPasswordShow ? (
                    <FaRegEyeSlash
                      className="absolute right-[10px] bottom-[10px] cursor-pointer hover:text-blue-800 hover:scale-110 duration-300 transition-all text-xl text-gray-800"
                      onClick={() => setNewPasswordShow(!newPasswordShow)}
                    />
                  ) : (
                    <FaRegEye
                      className="absolute right-[10px] bottom-[10px] cursor-pointer hover:text-blue-800 hover:scale-110 duration-300 transition-all text-xl text-gray-800"
                      onClick={() => setNewPasswordShow(!newPasswordShow)}
                    />
                  )}
                </div>
                <div className="w-full my-2 relative">
                  <label htmlFor="confirmPassword" className="block font-medium">
                    Confirm Password
                  </label>
                  <input
                    type={confirmPasswordShow ? "text" : "password"}
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border w-full rounded-xl mt-3 p-2 px-4 focus:outline-none focus:border-1 focus:border-blue-600 placeholder:text-gray-800 "
                    placeholder="Enter Full Name"
                    required
                  />
                  {confirmPasswordShow ? (
                    <FaRegEyeSlash
                      className="absolute right-[10px] bottom-[10px] cursor-pointer hover:text-blue-800 hover:scale-110 duration-300 transition-all text-xl text-gray-800"
                      onClick={() => setConfirmPasswordShow(!confirmPasswordShow)}
                    />
                  ) : (
                    <FaRegEye
                      className="absolute right-[10px] bottom-[10px] cursor-pointer hover:text-blue-800 hover:scale-110 duration-300 transition-all text-xl text-gray-800"
                      onClick={() => setConfirmPasswordShow(!confirmPasswordShow)}
                    />
                  )}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="notification">
              <SettingNotification/>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
