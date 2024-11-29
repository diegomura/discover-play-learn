import classNames from 'classnames';

import Text from '%/components/text';

function Section({ title, className, children }) {
  return (
    <div className={classNames('flex flex-col p-4', className)}>
      <Text className="mb-2 font-bold">{title}</Text>

      <div className="flex-1 overflow-scroll">{children}</div>
    </div>
  );
}

export default Section;
