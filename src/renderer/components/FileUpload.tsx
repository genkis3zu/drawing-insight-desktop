import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

const { Dragger } = Upload;

const FileUpload: React.FC = () => {
  const [fileList, setFileList] = useState<any[]>([]);

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    accept: '.jpg,.jpeg,.png,.pdf,.dwg,.dxf',
    fileList,
    beforeUpload: (file) => {
      const isValidType = ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type) ||
        file.name.toLowerCase().endsWith('.dwg') ||
        file.name.toLowerCase().endsWith('.dxf');
      
      if (!isValidType) {
        message.error(`${file.name} は対応していないファイル形式です`);
        return false;
      }

      const isLt50M = file.size / 1024 / 1024 < 50;
      if (!isLt50M) {
        message.error('ファイルサイズは50MB以下にしてください');
        return false;
      }

      return false;
    },
    onChange(info) {
      const { status } = info.file;
      if (status === 'done') {
        message.success(`${info.file.name} のアップロードが完了しました`);
      } else if (status === 'error') {
        message.error(`${info.file.name} のアップロードに失敗しました`);
      }
      setFileList(info.fileList);
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <div style={{ marginBottom: 24 }}>
      <Dragger {...props} style={{ padding: 20 }}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined style={{ fontSize: 48, color: '#1890ff' }} />
        </p>
        <p className="ant-upload-text">クリックまたはドラッグで図面ファイルをアップロード</p>
        <p className="ant-upload-hint">
          対応形式: JPEG, PNG, PDF, DWG, DXF (最大50MB)
        </p>
      </Dragger>
    </div>
  );
};

export default FileUpload;