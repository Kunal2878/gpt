"use client"
import React, { useState, useEffect } from 'react';
import { S3Client, PutObjectCommand,HeadObjectCommand } from '@aws-sdk/client-s3';
import {fetchUserAttributes } from "aws-amplify/auth";
import {sty1,sty2} from '../style'
import { fetchUserData } from '@/app/lib/cognito-amplify-action';
import { RootState } from './state'
import { useSelector, useDispatch } from 'react-redux';
import { 
setIsAvatarMenu,setMenu,setUsername,setAvatar

} from './slice'
const Avatar = () => {
  const dispatch = useDispatch();
    const isMenu = useSelector((state: RootState) => state.chat.isMenu);
    const isLogin = useSelector((state:RootState) => state.chat.isLogin);
    
    const isAvatarMenu = useSelector((state:RootState) => state.chat.isAvatarMenu);
    const avatar = useSelector((state:RootState) => state.chat.avatar);
    const userName = useSelector((state:RootState) => state.chat.userName);

  useEffect(() => {
    const fetchUser = async () => {
      const cookie = await fetchUserData();
      if (cookie) {
        const user = await fetchUserAttributes();
        if (user) {
          dispatch(setUsername(userName))
        }
      }
    };
    fetchUser();
  }, [userName]);

  useEffect(() => {
 
    if(userName)
    {
      getImageUrlFromS3().then((url) => {
        if (url) {
          dispatch(setAvatar(avatar));
        }
      });    }
  }, [userName]);


 
const getImageUrlFromS3 = async () => {
  const s3Client = new S3Client({
    region: process.env.NEXT_PUBLIC_REGION,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY!,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY!,
    },
  });

  const params = {
    Bucket: process.env.NEXT_PUBLIC_BUCKET!,
    Key: `${userName}_avatar`
  };

  try {
    const command = new HeadObjectCommand(params);
    const data = await s3Client.send(command);
    return `https://${process.env.NEXT_PUBLIC_BUCKET}.s3.${process.env.NEXT_PUBLIC_REGION}.amazonaws.com/${userName}_avatar`;
  } catch (error) {
    window.console.log("There is a problem on fetching the response, try after sometime");
  }

  return null;
};  
  const uploadToS3 = async (file: File) => {
    const s3Client = new S3Client({
      region: process.env.NEXT_PUBLIC_REGION,
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY!,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY!,
      },
    });

    const fileExtension = file.name.split('.').pop();
    // const fileName = `${userName}.${fileExtension}`;
    const fileName = `${userName}_avatar`;
    // console.log(fileExtension,fileName)
    const params = {
      Bucket: process.env.NEXT_PUBLIC_BUCKET!,
      Key: fileName,
      Body: file,
      ContentType: file.type,
    };

    try {
      await s3Client.send(new PutObjectCommand(params));
      const imageUrl = `https://${process.env.NEXT_PUBLIC_BUCKET}.s3.${process.env.NEXT_PUBLIC_REGION}.amazonaws.com/${fileName}`;
      setAvatar?.(imageUrl);
    } catch (error) {

    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadToS3(file);
    }
  };

  const initials = userName.slice(0, 2).toUpperCase();

  return (
    <div className={`w-40 h-48 md:w-48 md:h-54 ${sty2} z-50 bg-gray-600 text-white  rounded-md`}>
      {avatar ? (
        <img src={avatar} alt={userName} className="avatar-image size-20 rounded-full" />
      ) : (
        <div className="avatar-initials">{initials}</div>
      )}
        <span>{userName}</span>
      <label className={`${sty1} w-3/4 bg-purple-800 hover:bg-purple-500 text-white rounded-lg p-2 mt-2 cursor-pointer`}>
        {avatar && !avatar.includes("/solid_user.svg") ? "Edit Image" : "Upload Image"}
        <input
          type="file" 
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default Avatar;
