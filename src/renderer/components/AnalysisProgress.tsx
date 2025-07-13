import React, { useState, useEffect } from 'react';
import { Progress, List, Tag, Typography } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, LoadingOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface AnalysisItem {
  id: string;
  fileName: string;
  status: 'pending' | 'analyzing' | 'completed' | 'failed';
  progress: number;
  error?: string;
}

const AnalysisProgress: React.FC = () => {
  const [analysisList, setAnalysisList] = useState<AnalysisItem[]>([]);

  const getStatusIcon = (status: AnalysisItem['status']) => {
    switch (status) {
      case 'pending':
        return <ClockCircleOutlined style={{ color: '#8c8c8c' }} />;
      case 'analyzing':
        return <LoadingOutlined style={{ color: '#1890ff' }} />;
      case 'completed':
        return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      case 'failed':
        return <CloseCircleOutlined style={{ color: '#ff4d4f' }} />;
    }
  };

  const getStatusTag = (status: AnalysisItem['status']) => {
    const statusMap = {
      pending: { color: 'default', text: '待機中' },
      analyzing: { color: 'processing', text: '解析中' },
      completed: { color: 'success', text: '完了' },
      failed: { color: 'error', text: '失敗' }
    };
    const { color, text } = statusMap[status];
    return <Tag color={color}>{text}</Tag>;
  };

  return (
    <div style={{ marginTop: 24 }}>
      <h3>解析進捗</h3>
      {analysisList.length === 0 ? (
        <Text type="secondary">アップロードされたファイルはありません</Text>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={analysisList}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={getStatusIcon(item.status)}
                title={item.fileName}
                description={
                  item.status === 'analyzing' ? (
                    <Progress percent={item.progress} size="small" />
                  ) : item.status === 'failed' ? (
                    <Text type="danger">{item.error}</Text>
                  ) : null
                }
              />
              {getStatusTag(item.status)}
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default AnalysisProgress;