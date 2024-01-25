import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  generateTimestamps,
  initialValues,
  validationSchema,
} from "../../utils";
import useTimestampsStore from "../../stores/useTimestampsStore";

const CustomForm = () => {
  const setTimestamps = useTimestampsStore((state) => state.setTimestamps);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const timestamps = generateTimestamps(values.startDate, values.endDate);
      const amountSumArray = timestamps.map(
        (_, index) => parseFloat(values.amount) * (index + 1)
      );
      setTimestamps(timestamps, amountSumArray);
    } catch (error) {
      console.error("Error during form submission:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <label htmlFor="cryptocurrency">Cryptomoneda</label>
            <Field
              as="select"
              id="cryptocurrency"
              name="cryptocurrency"
              className="border border-black/15 p-2 rounded-md"
            >
              <option value="Bitcoin">Bitcoin</option>
            </Field>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="amount">Cantidad</label>
            <Field
              type="number"
              id="amount"
              name="amount"
              className="border border-black/15 p-2 rounded-md"
            />
            <ErrorMessage
              name="amount"
              component="div"
              className="text-red-500 h-5"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="frequency">Frecuencia</label>
            <Field
              as="select"
              id="frequency"
              name="frequency"
              className="border border-black/15 p-2 rounded-md"
            >
              <option value="monthly">Mensual</option>
            </Field>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="startDate">Fecha de inicio</label>
            <Field
              type="date"
              id="startDate"
              name="startDate"
              className="border border-black/15 p-2 rounded-md"
            />
            <ErrorMessage
              name="startDate"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="endDate">Fecha final</label>
            <Field
              type="date"
              id="endDate"
              name="endDate"
              className="border border-black/15 p-2 rounded-md"
            />
            <ErrorMessage
              name="endDate"
              component="div"
              className="text-red-500"
            />
          </div>

          <button
            type="submit"
            className={`p-2 ${
              isSubmitting ? "bg-white text-blue-900" : "bg-blue-600 text-white"
            } rounded-md`}
          >
            {isSubmitting ? "Simulando" : "Simular"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default CustomForm;
