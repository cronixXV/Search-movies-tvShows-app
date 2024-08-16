import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import { Form } from "react-router-dom"
import useInput from "../Hooks/useInput"

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 20px;
`

const Button = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`

const Textarea = styled.textarea`
  width: 96%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-height: 100px;
  resize: vertical;
`

const Input = styled.input`
  width: 96%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`

const ErrorMessage = styled.p`
  color: red;
  margin-top: 5px;
`

const options = [
  { value: "", label: "Выберите оценку" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
]

export default function FeedbackForm() {
  const name = useInput("", "name", true, {
    name: 'Поле "Ваше имя" обязательно для заполнения',
  })
  const rating = useInput("", "rating", true, {
    rating: 'Поле "Ваша оценка" обязательно для заполнения',
  })
  const comment = useInput("", "comment", true, {
    comment: 'Поле "Ваша рецензия" обязательно для заполнения',
  })
  // const [name, setName] = useState("")
  // const [rating, setRating] = useState("")
  // const [comment, setComment] = useState("")
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const nameRef = useRef(null)

  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus()
    }
  }, [])

  const handleOnSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}
    if (!name.value)
      newErrors.name = 'Поле "Ваше имя" обязательно для заполнения'
    if (!rating.value)
      newErrors.rating = 'Поле "Ваша оценка" обязательно для заполнения'
    if (!comment.value)
      newErrors.comment = 'Поле "Ваш рецензия" обязательно для заполнения'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setSubmitted(true)
  }

  useEffect(() => {
    if (name.error)
      setErrors((prevErrors) => ({ ...prevErrors, name: name.error }))
    if (rating.error)
      setErrors((prevErrors) => ({ ...prevErrors, rating: rating.error }))
    if (comment.error)
      setErrors((prevErrors) => ({ ...prevErrors, comment: comment.error }))
  }, [name, rating, comment])

  if (submitted) {
    return (
      <Container>
        <h2>Спасибо за ваш отзыв</h2>
        <p>Имя: {name.value}</p>
        <p>Оценка: {rating.value}</p>
        <p>Комментарий: {comment.value}</p>
      </Container>
    )
  }

  return (
    <Container>
      <h2>Оставьте свою оценку фильму или сериалу</h2>
      <Form
        action="/feedback"
        method="post"
        // onSubmit={(e) => {
        //   if (!confirm("Вы уверены?")) {
        //     e.preventDefault()
        //   }
        // }}
        onSubmit={handleOnSubmit}
      >
        <div>
          <Label htmlFor={name.id}>Ваше имя</Label>
          <Input
            {...name}
            ref={nameRef}
          />
          {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}

          {/* <Input
            type="text"
            id="name"
            name="name"
            value={name}
            ref={nameRef}
            onChange={(e) => setName(e.target.value)}
          />
          {error.name && (
            <ErrorMessage style={{ color: "red" }}>{error.name}</ErrorMessage>
          )} */}
        </div>

        <div>
          <Label htmlFor={rating.id}>Ваша оценка</Label>
          <Select {...rating}>
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </Select>
          {errors.rating && <ErrorMessage>{errors.rating}</ErrorMessage>}

          {/* <Select
            id="rating"
            name="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="">Выберите оценку</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Select>
          {error.rating && (
            <ErrorMessage style={{ color: "red" }}>{error.rating}</ErrorMessage>
          )} */}
        </div>

        <div>
          <Label htmlFor={comment.id}>Ваша рецензия</Label>
          <Textarea {...comment} />
          {errors.comment && <ErrorMessage>{errors.comment}</ErrorMessage>}
          {/* <Textarea
            id="comment"
            name="comment"
            value={comment}
            rows={3}
            onChange={(e) => setComment(e.target.value)}
          />
          {error.comment && (
            <ErrorMessage style={{ color: "red" }}>
              {error.comment}
            </ErrorMessage>
          )} */}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button type="submit">Отправить</Button>
        </div>
      </Form>
    </Container>
  )
}

//action

// export const feedbackAction = async ({ request }) => {
//   const data = await request.formData()

//   const result = {
//     name: data.get("name"),
//     rating: data.get("rating"),
//     comment: data.get("comment"),
//   }

//   if (result.name.length < 3) {
//     return { error: "Ваша оценка недостаточно полная" }
//   }

//   return { isOk: true }
// }
