



import React, { useState, useEffect } from "react";
import profileImg from "@/assets/images/dummy-profile-img-1.jpg";
import profileImgBg from "@/assets/images/userProfileBg.png";
import { useSelector } from "react-redux";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaRegUserCircle } from "react-icons/fa";
import { CiRepeat } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import EditProfile from "@/components/editProfile";
import SettingNotification from "@/components/settingNotification";

const Profile = () => {
  const user = useSelector((state) => state?.auth?.user);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordShow, setNewPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || user?.profileImage || profileImg
  );
  const [profileData, setProfileData] = useState(() => {
    const savedProfileData = JSON.parse(localStorage.getItem("profileData"));
    return savedProfileData || {
      username: user?.username || "Hibbanur Rahman",
      email: user?.email || "hibbanrahmanhyt@gmail.com",
      mobile: user?.mobile || "",
      role: user?.role || "",
      location: user?.location || "",
      languages: user?.languages || "",
    };
  });

  // Save profile data to localStorage whenever it changes
  // useEffect(() => {
  //   localStorage.setItem("profileData", JSON.stringify(profileData));
  // }, [profileData]);

  // // Save profile image to localStorage whenever it changes
  // useEffect(() => {
  //   localStorage.setItem("profileImage", profileImage);
  // }, [profileImage]);

  return (
    <div className="w-full px-4 pb-8">
      <h1 className="text-lg font-medium">View Profile</h1>
      <div className="flex w-full gap-[20px] my-4">
        {/* Profile Info Section */}
        <div className="w-4/12 h-min flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg border overflow-hidden">
          <img src={profileImgBg} alt="Profile Background" className="w-full h-[120px]" />
          <div className="w-[150px] h-[150px] mt-[-80px] rounded-full p-1 bg-white">
            <img src={profileImage} alt="Profile" className="w-full h-full rounded-full" />
          </div>
          <h1 className="text-xl font-medium mt-4">{profileData.username}</h1>
          <p className="text-base text-gray-600 mb-4">{profileData.email}</p>
          <div className="w-full p-3 px-6 pb-6 border border-s-0 border-e-0 border-b-0">
            <h1 className="text-xl font-medium">Personal Info</h1>
            {Object.entries(profileData).map(([key, value]) => (
              <div key={key} className="flex w-full gap-[10px] my-2">
                <div className="w-3/12">
                  <p className="font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                </div>
                <div className="w-9/12">
                  <p className="text-gray-600">: {value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs Section */}
        <div className="w-8/12 bg-white rounded-2xl shadow-lg border p-5">
          <Tabs defaultValue="editProfile" className="w-full">
            <TabsList>
              <TabsTrigger value="editProfile" className="flex gap-[5px]">
                <FaRegUserCircle />
                <p>Edit Profile</p>
              </TabsTrigger>
              <TabsTrigger value="changePassword" className="flex gap-[5px]">
                <CiRepeat />
                <p>Change Password</p>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="editProfile" className="w-full">
              <EditProfile setProfileData={setProfileData} setProfileImage={setProfileImage} />
            </TabsContent>

            <TabsContent value="changePassword">
              <div className="w-full my-3">
                <div className="w-full my-2 relative">
                  <label htmlFor="newPassword" className="block font-medium">New Password</label>
                  <input
                    type={newPasswordShow ? "text" : "password"}
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="border w-full rounded-xl mt-3 p-2 px-4 focus:outline-none focus:border-1 focus:border-blue-600 placeholder:text-gray-800"
                    placeholder="Enter New Password"
                    required
                  />
                  {newPasswordShow ? (
                    <FaRegEyeSlash className="absolute right-[10px] bottom-[10px] cursor-pointer text-xl text-gray-800 hover:text-blue-800 hover:scale-110 duration-300 transition-all" onClick={() => setNewPasswordShow(!newPasswordShow)} />
                  ) : (
                    <FaRegEye className="absolute right-[10px] bottom-[10px] cursor-pointer text-xl text-gray-800 hover:text-blue-800 hover:scale-110 duration-300 transition-all" onClick={() => setNewPasswordShow(!newPasswordShow)} />
                  )}
                </div>
                <div className="w-full my-2 relative">
                  <label htmlFor="confirmPassword" className="block font-medium">Confirm Password</label>
                  <input
                    type={confirmPasswordShow ? "text" : "password"}
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border w-full rounded-xl mt-3 p-2 px-4 focus:outline-none focus:border-1 focus:border-blue-600 placeholder:text-gray-800"
                    placeholder="Confirm New Password"
                    required
                  />
                  {confirmPasswordShow ? (
                    <FaRegEyeSlash className="absolute right-[10px] bottom-[10px] cursor-pointer text-xl text-gray-800 hover:text-blue-800 hover:scale-110 duration-300 transition-all" onClick={() => setConfirmPasswordShow(!confirmPasswordShow)} />
                  ) : (
                    <FaRegEye className="absolute right-[10px] bottom-[10px] cursor-pointer text-xl text-gray-800 hover:text-blue-800 hover:scale-110 duration-300 transition-all" onClick={() => setConfirmPasswordShow(!confirmPasswordShow)} />
                  )}
                </div> 
              </div>
            </TabsContent>

            <SettingNotification />
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
