import React, { useState } from 'react';
import { Table, Button, Space, Input, Select, message } from 'antd';
import { DownloadOutlined, EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Search } = Input;
const { Option } = Select;

interface DataType {
  key: string;
  id: string;
  fileName: string;
  drawingNumber: string;
  title: string;
  dimensions: string;
  material: string;
  quantity: number;
  analyzedAt: string;
}

const ResultTable: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [editingKey, setEditingKey] = useState('');
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState<DataType[]>([]);

  const isEditing = (record: DataType) => record.key === editingKey;

  const edit = (record: DataType) => {
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: string) => {
    setEditingKey('');
    message.success('保存しました');
  };

  const handleExport = (format: 'csv' | 'excel') => {
    message.info(`${format.toUpperCase()}形式でエクスポートします`);
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    const filtered = data.filter(item =>
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'ファイル名',
      dataIndex: 'fileName',
      key: 'fileName',
      sorter: (a, b) => a.fileName.localeCompare(b.fileName),
    },
    {
      title: '図番',
      dataIndex: 'drawingNumber',
      key: 'drawingNumber',
    },
    {
      title: 'タイトル',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '寸法',
      dataIndex: 'dimensions',
      key: 'dimensions',
    },
    {
      title: '材質',
      dataIndex: 'material',
      key: 'material',
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: '解析日時',
      dataIndex: 'analyzedAt',
      key: 'analyzedAt',
      sorter: (a, b) => new Date(a.analyzedAt).getTime() - new Date(b.analyzedAt).getTime(),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Space>
            <Button
              icon={<SaveOutlined />}
              size="small"
              type="primary"
              onClick={() => save(record.key)}
            />
            <Button
              icon={<CloseOutlined />}
              size="small"
              onClick={cancel}
            />
          </Space>
        ) : (
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={() => edit(record)}
            disabled={editingKey !== ''}
          />
        );
      },
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="検索..."
          onSearch={handleSearch}
          style={{ width: 200 }}
        />
        <Select defaultValue="csv" style={{ width: 120 }}>
          <Option value="csv">CSV</Option>
          <Option value="excel">Excel</Option>
        </Select>
        <Button
          icon={<DownloadOutlined />}
          onClick={() => handleExport('csv')}
        >
          エクスポート
        </Button>
      </Space>
      <Table
        columns={columns}
        dataSource={searchText ? filteredData : data}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1000 }}
      />
    </div>
  );
};

export default ResultTable;