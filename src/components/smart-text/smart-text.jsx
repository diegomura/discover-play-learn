import classNames from 'classnames';
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

const colorHighlight = new Highlight();
CSS.highlights.set(`text-highlight`, colorHighlight);

function SmartText(
  { value, disabled, className, maxLength, onChange, onHovered },
  forwardedRef
) {
  const ref = useRef();

  const initialValue = useRef(value);

  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const selection = window.getSelection();
    selection.removeAllRanges();

    if (hovered !== null) {
      const range = document.createRange();
      const text = ref.current.firstChild;

      try {
        range.setStart(text, hovered);
        range.setEnd(text, hovered + 1);
        selection.addRange(range);
      } catch (error) {
        // noop
      }
    }
  }, [hovered]);

  const handleChange = e => {
    onChange(e.target.textContent);
  };

  const handleMouseUp = () => {
    const selection = window.getSelection();

    if (selection.rangeCount !== 1) return;
    if (selection.focusNode !== ref.current.firstChild) return;

    const index = Math.min(selection.baseOffset, selection.focusOffset);

    setHovered(index);
    onHovered?.(index);
  };

  const highlightRange = useCallback((start, end) => {
    const range = new Range();
    range.setStart(ref.current.firstChild, start);
    range.setEnd(ref.current.firstChild, end);
    colorHighlight.add(range);
  }, []);

  const blurHighlight = useCallback(() => {
    colorHighlight.clear();
  }, []);

  useImperativeHandle(forwardedRef, () => ({ highlightRange, blurHighlight }), [
    highlightRange,
    blurHighlight,
  ]);

  return (
    <p
      ref={ref}
      autoFocus
      maxLength={maxLength}
      contentEditable={!disabled}
      className={classNames('outline-none', className)}
      suppressContentEditableWarning
      dangerouslySetInnerHTML={{ __html: initialValue.current }}
      spellCheck={false}
      onInput={handleChange}
      onMouseUp={handleMouseUp}
    />
  );
}
export default forwardRef(SmartText);
