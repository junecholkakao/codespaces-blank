import { useRef, useState } from "react";
import Input from "./Input";
import Modal from "./Modal";

export default function NewProject({cancelHandler, saveHandler}) {
  const modal = useRef()
  const [error, setError] = useState(null)
  const titleRef = useRef()
  const descRef = useRef()
  const dueDateRef = useRef()

  function handleSaveButton() {
    const title = titleRef.current.value.trim()
    const description = descRef.current.value.trim()
    const dueDate = dueDateRef.current.value.trim()


    if (title==='' || description==='' || dueDate==='')
    {
      modal.current.open()
      return;
    }

    if (!title) {
      setError("Enter Title")
    } else if (!description) {
      setError("Enter Description")
    } else if (!dueDate) {
      setError("Enter Due Date")
    } else {
      saveHandler({
        title: title,
        description: description,
        dueDate: dueDate
      })
    }

  }

  return (
    <>
      <Modal ref={modal} buttonCaption="Ok">
        <h2 className='text-xl font-bold text-stone-800 my-4'>Invalid Input</h2>
        <p className='text-stone-600 mb-2'>Oops... looks like you forgot to enter a value</p>
        <p className='text-stone-600 mb-4'>Please make sure your provide a valid value for every input field.</p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button className="font-bold text-stone-800 hover:text-stone-950"
              onClick={cancelHandler}
            >
              Cancel
            </button>
          </li>
          <li>
            <button className="px-6 py-2 rounded-md font-bold bg-stone-800 text-stone-50 hover:bg-stone-950"
              onClick={handleSaveButton}
            >
              Save
            </button>
          </li>
        </menu>
        {error && <p>{error}</p>}
        <div>
          <Input type='text' ref={titleRef} label="Title" />
          <Input ref={descRef} label="Description" textarea />
          <Input type='date' ref={dueDateRef} label="Due Date" />
        </div>
      </div>
    </>
  );
}
