import React, { useEffect, useState } from "react";
import Arrow from "../../Icons/Arrow";
import { checkForScrollbar } from "../../services/scrollbarService";

export default function Select({
  className,
  list,
  callback,
  setSelectedProject,
}) {
  const [selectList, setSelectList] = useState(list);
  const [opened, setOpened] = useState(false);
  let selectedTitle = selectList.find((item) => item.selected === true).Name;

  function selectItem(index) {
    setSelectList((state) =>
      state.map((item, itemIndex) => ({
        ...item,
        selected: itemIndex === index ? true : false,
      }))
    );
    setSelectedProject(selectList[index]);
    callback && callback(index);
  }

  function toggleSelect() {
    setOpened((state) => !state);
  }

  useEffect(() => {
    function handleDocumentClick() {
      if (opened) {
        toggleSelect();
      }
    }

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [opened]);

  useEffect(() => {
    setSelectList(list);
    // setSelectedProject(list.find((item) => item.selected === true));
  }, [list]);

  return (
    <div
      className={
        "select " +
        (className || "") +
        (opened ? " opened" : "") +
        (checkForScrollbar() ? " scroll-visible" : "")
      }
    >
      <button className="select__button" onClick={toggleSelect}>
        <span className="select__button-text">{selectedTitle}</span>
        <Arrow className="select__button-icon" />
      </button>
      <div className="select__list-wrapper">
        <ul className="select__list scrollwrapper select__scrollwrapper">
          {selectList.map((item, index) => {
            return (
              <li className="select__item" key={item.id}>
                <button
                  className={
                    "select__item-button" + (item.selected ? " selected" : "")
                  }
                  onClick={() => {
                    selectItem(index);
                  }}
                >
                  {item.Name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
