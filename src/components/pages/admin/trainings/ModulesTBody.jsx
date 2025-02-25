import React from "react";
import Button from "../../../shared/Button";

const ModulesTBody = ({ data, columns, isAdmin, moduleModification, deleteModule }) => {
  return (
    <tbody>
      {data.map((item) => (
        <tr key={item.id}>
          {columns.map((col) => (
            <td key={col.key}>
              {col.render ? col.render(item) : item[col.key]}
            </td>
          ))}
          {isAdmin && (
            <td className="d-flex flex-column">
              {moduleModification?.id === module.id ? (
                <>
                  <Button
                    buttonTitle="Enregistrer"
                    className="bg-fe-orange"
                    //    setAction={submitModification}
                  />
                  <Button
                    buttonTitle="Annuler"
                    className="bg-danger"
                    // onClick={() => setModuleModification(null)}
                  />
                </>
              ) : (
                <Button
                  buttonTitle="Modifier"
                  className="bg-fe-orange"
                  //   onClick={() =>
                  //     setModuleModification({
                  //       id: module.id,
                  //       title: module.title,
                  //       commentary: module.commentary,
                  //     })
                  //   }
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
