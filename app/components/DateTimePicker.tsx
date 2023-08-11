'use client'

import { useRef } from "react";

export default function DateTimePicker({ name_input, content_span }: { name_input: string, content_span: string }) {

    const inputRef = useRef<HTMLInputElement | null>(null)
    const handleIconClick = () => { inputRef.current?.showPicker() }

    return (
        <>
            <span>{content_span}</span>
            <label className="inline-block w-8 h-8 cursor-pointer text-2xl" onClick={handleIconClick} htmlFor={name_input}>
                📅
            </label>
            <input type="datetime-local" name={name_input} ref={inputRef} className="absolute left-0 bottom-0 w-0 h-0 cursor-pointer" />
        </>
    )
}