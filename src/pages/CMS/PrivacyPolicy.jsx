import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Card, Typography, Input, Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from 'react-redux';
import APIS from '../../axios/Index';


function PrivacyPolicy() {
  const [data, setData] = useState({ content: '' })
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const getcms = useSelector((state) => state.GetCms);
    useEffect(() => {
        dispatch(APIS.cmsget(1));
    }, [dispatch]);


    const hendleUpdate = async () => {
        setLoading(true);
        try {
            await dispatch(APIS.UpdateCms({ content: data, type: 1 }));
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    const handleEditorChange = (event, editor) => {
        const content = editor.getData();
        setData(content);

    }
  return (
    <Card className='p-3 w-full'>

      <div className="mb-8  w-full flex justify-center">
        <Typography variant="h2" color="gray" className="mb-2 mt-3 ml-4  font-sans text-2xl">
        {getcms?.GetCms?.data?.body?.title}
        </Typography>
      </div>

      <CKEditor
        editor={ClassicEditor}
        data={getcms?.GetCms?.data?.body?.content}
        onChange={handleEditorChange}
      />

      <div className=" flex justify-end mt-10">
        <Button onClick={hendleUpdate} loading={loading}>Submit</Button>
      </div>

    </Card>
  );
}

export default PrivacyPolicy;
