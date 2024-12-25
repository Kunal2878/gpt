// components/FileUpload.tsx
"use client"
import * as  React from 'react';
import {sty1,sty2} from '../../style'
import Image from 'next/image'
import  {UseAppContext}  from '../../index'
import {FileContent} from '../../components/userFilePrompt/filerompt'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../state'

import { 
setFiles,setRemoveFile, setShowError
} from '../slice'
import { remove } from 'aws-amplify/storage/server';
function FileUpload ()  {

    const dispatch = useDispatch();
    const files = useSelector((state: RootState) => state.chat.files);
    const showError = useSelector((state: RootState) => state.chat.showError);
    const [isUploadDisabled, setIsUploadDisabled] = React.useState(false);
    const checkFileExtension = (newFile: File) => {
        if (files && files.length > 0) {
            if(files[files.length - 1].type.includes("image") && newFile.type.includes("image") )
            {   
                
                return true
            }

            else{

                const prevExtension = files[files.length - 1].name.split('.').pop()?.toLowerCase();
                const newExtension = newFile.name.split('.').pop()?.toLowerCase();
                if (prevExtension !== newExtension) {
                    setIsUploadDisabled(true);
                    return false;
                }
            }
        }
        return true;
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = Array.from(event.target.files || []);
        const allFilesValid = newFiles.every(checkFileExtension);
        if (allFilesValid) {
            newFiles.map(file => {
                dispatch(setFiles(file));
            });
            setIsUploadDisabled(false);
        }
    };
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const newFiles = Array.from(event.dataTransfer.files);
        const allFilesValid = newFiles.every(checkFileExtension);
        if (allFilesValid) {
            newFiles.map(file => {
                dispatch(setFiles(file));
            });
            setIsUploadDisabled(false);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const removeFile = (index: number) => {
        dispatch(setRemoveFile(index));
        setIsUploadDisabled(false);
    };

    const getFileIcon = (fileName: File) => {
        if(fileName){

            const type = fileName.type
            if (type.includes("image")) {

                return "/img-icon.svg"
            }
            else if (type.includes("pdf")) {

                return "/pdf-icon.svg"
            }
            else if (type.includes("docx")) {

                return "/word-file.svg"
            }
            else if (type.includes("doc")) {

                return "/word-file.svg"
            }
            else if (type.includes("xls")) {

                return "/doc.svg"
            }
            else if (type.includes("mp3")) {

                return "/mp3-icon.svg"
            }

            else
            return "/doc.svg"
        }
        return "/doc.svg"
    }

    const getColor = (file: File) => {

        if(file.type.includes("image")) {
            return "yellow-400"
        }
        else if(file.type.includes("pdf")) {
           
            return "border-red-600"
        }               
        else if(file.type.includes("doc") || file.type.includes("docx")) {
            return "border-blue-400"
        }
        else if(file.type.includes("mp3")) {
            return "border-green-600"
        }
        else {
            return "border-purple-400"
        }
    }

    const sendFile =  async () => {
        
        let prmt="summarise this file";
        if(files.length>0){

         const  getFileResponse=   await FileContent(prmt, files)
         if(getFileResponse.status===200)
         {

         }
         else{
            dispatch(setShowError("Error on getting the response, please try after some time"))
         }
        }
    }

    return (
        <div className={`${sty2}`}>
            <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                style={{
                    border: '2px dashed #ccc',
                    borderRadius: '4px',
                    padding: '20px',
                    textAlign: 'center',
                    cursor: 'pointer',
                }}
            >
                <p className='mb-2'>Drag & drop files here, or click to select files</p>
                <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                />
                <label htmlFor="file-upload" className={`text-sm bg-purple-400 hover:bg-purple-800 cursor-pointer mt-4 rounded-lg p-2`}>
                  Click to add files

                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                </label>
            </div>
            <ul className ='mt-2 max-h-40 overflow-y-auto'>
                {files && files.map((file: File, index: number) => (
                    <li key={index}
                    className={`flex flex-row justify-start border-2 ${getColor(file)} bg-slate-500 mb-1 p-1 rounded-md`}
                    >
                        <Image
                            src={getFileIcon(file)}
                            width={10}
                            height={10}
                            alt={file.name}
                            className='size-6 md:size-8'
                        />
                        
                        <span className="mr-4 ml-2">{file.name}</span>

                        <Image
                        src='/cross.png'
                        width={10}
                        height={10}
                        alt={file.name}
                        className='size-6 md:size-8 cursor-pointer'
                        onClick={() => removeFile(index)}
                        />
                    </li>
                ))}
                {
                    isUploadDisabled && (
                        <span className='bg-pink-100 text-red-800 rounded-md p-2 mt-2'>!!All files must be in same format !</span>
                    )
                }
               
            </ul>
            {/* {
                files.length > 0 && (
                    <div className={`size-15 bg-red-400 text-white rounded-md`} onClick={() => sendFile()}>
                    Send
                    </div>
                )
            } */}
        </div>
    );};

export default FileUpload;