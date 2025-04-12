export interface UsersTableProps {
    data: {
      tasks: Array<{
        _id: string;
        title: string;
        description: string;
      }>;
    };
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    getSequentialNumber: (index: number) => number;
  }

export interface TaskFormData {
  title: string;
  description: string;
}

export interface UpdateTaskFormData {
  title: string;
  description: string;
  status: string;
}