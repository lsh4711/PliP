import { ReactElement, useEffect, useRef, useState } from 'react';
import { ReactComponent as EditIcon } from '@/assets/icons/edit.svg';
import Button from '@/components/atom/Button';

type Props = {
  title: string | ReactElement;
  content: string | Date | number;
  editable?: boolean;
};

const maxTitleLength = 30;

const GridItem = ({ title, content, editable }: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState(!editable ? (content as string) : '서울 여행 레츠고!');

  const editRef = useRef(document.createElement('div'));

  useEffect(() => {
    if (editable && text.length === 0) {
      onToggleEditHandler();
    } else if (editable && text.length > 0) {
      editRef.current.innerHTML = text;
    }
  }, []);

  const onInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.innerHTML;

    if (inputText.length > maxTitleLength) {
      alert(`일정의 제목은 ${maxTitleLength}자를 초과할 수 없습니다.`);
      e.target.innerHTML = text;
      return;
    }
    setText(inputText);
  };

  const onToggleEditHandler = () => {
    setIsEdit(!isEdit);
    setTimeout(() => {
      onEditFocus();
    }, 0);
  };

  const onEditFocus = () => {
    editRef.current.focus();

    const range = document.createRange();
    const sel = window.getSelection();

    if (
      typeof editRef.current.lastChild === 'object' &&
      editRef.current.lastChild !== null &&
      editRef.current.lastChild.nodeType === Node.TEXT_NODE
    ) {
      // @ts-ignore
      range.setStart(editRef.current.lastChild, editRef.current.lastChild.length);
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  };

  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="font-bold text-[#4568DC]">{title}</div>
      <div
        className="outline-none"
        ref={editRef}
        contentEditable={isEdit}
        onInput={onInputText}
        onBlur={onToggleEditHandler}
        placeholder="여행의 이름을 정해주세요!"
        role="input"
      >
        {!editable && text}
      </div>
      {editable && (
        <Button onClick={onToggleEditHandler} className="p-0" hovercolor={'default'}>
          <EditIcon width={16} height={16} />
        </Button>
      )}
    </div>
  );
};

export default GridItem;
