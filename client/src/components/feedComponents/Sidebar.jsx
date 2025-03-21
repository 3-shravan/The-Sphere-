import React from 'react';

const tabs = ['Posts Feeds', 'Notifications', 'Messages', 'Profile', 'Settings'];

const Sidebar = () => {
  const [selected, setSelected] = React.useState(0);

  const handleSelected = (index) => {
    setSelected(index);
  };

  return (
    <div className='h-full  font-[Gilroy-Medium] flex flex-col pt-8 items-center'>
      {tabs.map((tab, index) => (
        <h2
          key={index}
          onClick={() => handleSelected(index)}
          className={`cursor-pointer px-3 py-1 rounded m-1 w-32
            ${selected === index ?
              'bg-[var(--font)] text-[var(--bg)] '
              : ' text-[var(--font)]'}`}
        >
          {tab}
        </h2>
      ))}

    </div>
  );
};

export default Sidebar;
