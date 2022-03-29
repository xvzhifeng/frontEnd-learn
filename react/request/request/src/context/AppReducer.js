export default function appReducer(state, action) {
  switch (action.type) {
    case "INIT_EMPLOYEE":
      console.log({
        ...state,
        employees: [...state.employees, ...action.payload],
      });
      console.log(action);
      // 更新state，
      // 其中payload是新得数据
      return {
        ...state,
        employees: [...state.employees, ...action.payload],
      };

    case "ADD_EMPLOYEE":
      console.log({
        ...state,
        employees: [...state.employees, action.payload],
      });
      console.log(action);
      // 更新state，
      // 其中payload是新得数据
      return {
        ...state,
        employees: [...state.employees, action.payload],
      };

    case "EDIT_EMPLOYEE":
      const updatedEmployee = action.payload;

      // 只更新特定key得数据
      const updatedEmployees = state.employees.map((employee) => {
        if (employee.key === updatedEmployee.key) {
          return updatedEmployee;
        }
        return employee;
      });

      return {
        ...state,
        employees: updatedEmployees,
      };

    /**
     * filter
     * filter也是一个常用的操作，它用于把Array的某些元素过滤掉，然后返回剩下的元素。
     * 和map()类似，Array的filter()也接收一个函数。和map()不同的是，filter()把传入的函数依次作用于每个元素，然后根据返回值是true还是false决定保留还是丢弃该元素
     */
    case "REMOVE_EMPLOYEE":
      console.log("REMOVE_EMPLOYEE");
      return {
        ...state,
        employees: state.employees.filter(
          (employee) => employee.key !== action.payload
        ),
      };

    case "UPDATE_INDEX":
      console.log("UPDATE_INDEX");
      return {
        ...state,
        index: action.payload,
      };

    default:
      return state;
  }
}
