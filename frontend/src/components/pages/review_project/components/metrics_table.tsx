

import {
  FaCogs,
  FaCode,
  FaWrench,
  FaTachometerAlt,
  FaFlask,
  FaBook,
} from "react-icons/fa";
import { getGradeColor } from "../../../../util/ui_helper";
import { toTitleCase } from "../../../../util/util_functions";


interface MetricsTableProps {
    metrics: Record<string, number>;
}


export function MetricsTable({ metrics }: MetricsTableProps) {
  const iconMap: Record<string, React.ElementType> = {
    architecture: FaCogs,
    codeQuality: FaCode,
    maintainability: FaWrench,
    performance: FaTachometerAlt,
    testing: FaFlask,
    documentation: FaBook,
  };

  return (
    <>
     
      <div className="overflow-x-auto border border-slate-300 dark:border-slate-700 rounded-lg w-full  dark:text-white">
        <table className="w-full text-lg border-collapse">
          <caption className="text-sm text-slate-500 dark:text-slate-400 p-2">
            Repository Metrics
          </caption>
          <thead className="bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200">
            <tr>
              <th
                scope="col"
                className="border px-4 py-3 text-center font-medium"
              >
                Metric
              </th>
              <th
                scope="col"
                className="border px-4 py-3 text-center font-medium"
              >
                Score
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(metrics).map(([key, value]) => {
              const Icon = iconMap[key] ?? FaCode;

              return (
                <tr
                  key={key}
                  className="odd:bg-white even:bg-slate-50 dark:odd:bg-slate-900 dark:even:bg-slate-800"
                >
                  <td className="border px-4 py-3 flex items-center gap-3">
                    <Icon className="text-slate-600 dark:text-slate-300" size={20} />
                    {toTitleCase(key)}
                  </td>
                  <td
                    className={`border px-4 py-3 font-semibold text-center rounded ${getGradeColor(
                      value
                    )}`}
                  >
                    {value}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
