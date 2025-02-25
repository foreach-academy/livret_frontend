import React from "react";
import Button from "../../../shared/Button";
import TextArea from "../../../shared/form/TextArea";

const ModulesTBody = ({
  data,
  columns,
  isAdmin,
  moduleModification,
  deleteModule,
  setModuleModification,
  submitModification,
}) => {
  return (
    <tbody>
      {data.map((item) => (
        <tr key={item.id}>
          {columns.map((col) => (
            <td key={col.key}>
              {moduleModification?.id === item.id ? (
                <TextArea
                  value={moduleModification[col.key]}
                  onChange={(e) =>
                    setModuleModification({
                      ...moduleModification,
                      [col.key]: e.target.value,
                    })
                  }
                />
              ) : (
                item[col.key]
              )}
            </td>
          ))}
          {isAdmin && (
            <td className="d-flex flex-column">
              {moduleModification?.id === item.id ? (
                <>
                  <Button
                    buttonTitle="Enregistrer"
                    className="bg-fe-orange"
                    setAction={submitModification}
                  />
                  <Button
                    buttonTitle="Annuler"
                    className="bg-danger"
                    setAction={() => setModuleModification(null)}
                  />
                </>
              ) : (
                <Button
                  buttonTitle="Modifier"
                  className="bg-fe-orange"
                  setAction={() =>
                    setModuleModification({
                      id: item.id,
                      title: item.title,
                      commentary: item.commentary,
                    })
                  }
                />
              )}
              <Button
                buttonTitle="Supprimer"
                className="bg-danger"
                setAction={() => deleteModule(item.id)}
              />
            </td>
          )}
        </tr>
      ))}
    </tbody>
  );
};

export default ModulesTBody;
