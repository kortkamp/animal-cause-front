'use client'

import clsx from 'clsx';
import { title } from 'process';
import React, { ReactNode, useState } from 'react';

const Tabs = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className='mt-10'>
      <div className="tab-headers flex gap-4 bg-transparent">
        {React.Children.map(children, (child, index) => (
          <button
            key={index}
            className={clsx(
              "text-xl text-default border-b-2 border-gray-300 pb-2 mb-10 px-4",
              index === activeTab && "text-primary border-primary"
            )}
            onClick={() => handleTabClick(index)}
          >
            {child.props.title}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {React.Children.toArray(children)[activeTab]}
      </div>
    </div>
  );
};

const TabPanel = ({ children }: { children: ReactNode, title: string, }) => {
  return <div title={title}>{children}</div>;
};


export { TabPanel, Tabs }