import React from 'react';
import { Form, Button } from 'antd';
import NiceForm from '../../src/NiceForm';
import config from '../../src/config';
import { render, screen } from '@testing-library/react';
import antdAdapter, { AntdNiceFormMeta } from '../../src/adapters/antdAdapter';
import '@testing-library/jest-dom';

const FieldCondition = () => {
  const [form] = Form.useForm();
  const favoriteFruit = Form.useWatch('favoriteFruit', form);
  const handleFinish = (values: unknown) => {
    console.log('Submit: ', values);
  };
  const meta: AntdNiceFormMeta = {
    fields: [
      {
        key: 'favoriteFruit',
        label: 'Favorite Fruit',
        widget: 'radio-group',
        options: ['Apple', 'Orange', 'Other'],
        initialValue: 'Apple',
      },
      {
        key: 'otherFruit',
        label: 'Other',
        condition: () => favoriteFruit === 'Other',
      },
    ],
  };

  return (
    <Form form={form} onFinish={handleFinish}>
      <NiceForm meta={meta} />
      <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

describe('antd/FieldCondition', () => {
  config.addAdapter(antdAdapter);

  it('renders FieldCondition Nice Form using Antd', () => {
    render(<FieldCondition />);
    const inputFavoriteFruit = screen.getByText('Favorite Fruit');
    expect(inputFavoriteFruit).toBeInTheDocument();
  });
});
