import React, { useState, useCallback } from 'react';
import { Form, Button } from 'antd';
import type { RadioChangeEvent } from 'antd';
import NiceForm from '../../src/NiceForm';
import config from '../../src/config';
import { render, screen } from '@testing-library/react';
import antdAdapter, { AntdNiceFormMeta } from '../../src/adapters/antdAdapter';
import '@testing-library/jest-dom';

const MultipleColumns = () => {
  const [form] = Form.useForm();
  const [columns, setColumns] = useState(2);
  const handleFinish = useCallback((values: any) => {
    console.log('Submit: ', values);
  }, []);
  const meta: AntdNiceFormMeta = {
    columns,
    fields: [
      {
        key: 'columns',
        label: 'Columns',
        widget: 'radio-group',
        widgetProps: {
          optionType: 'button',
          buttonStyle: 'solid',
          onChange: (evt: RadioChangeEvent) => setColumns(evt.target.value),
        },
        options: [1, 2, 3, 4],
        initialValue: 2,
        help: 'Change columns to show layout change',
      },
      { key: 'input', label: 'Input', required: true, tooltip: 'This is the name.' },
      {
        key: 'checkbox',
        label: 'Checkbox',
        widget: 'checkbox',
        initialValue: true,
      },
      { key: 'select', label: 'Select', widget: 'select', options: ['Apple', 'Orange', 'Banana'] },
      { key: 'password', label: 'Password', widget: 'password' },
      { key: 'textarea', label: 'Textarea', widget: 'textarea' },
      { key: 'number', label: 'Number', widget: 'number' },
      { key: 'date-picker', label: 'Date Picker', widget: 'date-picker' },
    ],
  };
  return (
    <Form form={form} layout="horizontal" onFinish={handleFinish} style={{ width: '1000px' }}>
      <NiceForm meta={meta} />
      <Form.Item className="form-footer">
        <Button htmlType="submit" type="primary">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

describe('antd/MultipleColumns', () => {
  config.addAdapter(antdAdapter);

  it('renders MultipleColumns Form using Antd', () => {
    render(<MultipleColumns />);
    const inputField = screen.getByLabelText('Input');
    expect(inputField).toBeInTheDocument();
  });
});
