const UserNamesEnum = {
  ADMIN: "admin",
  PROJETCT_ADMIN: "project_admin",
  MEMBER: "member",
};

export const AvailableUserRole = Object.values(UserNamesEnum);

const TaskStatusEnum = {
  TODO: "todo",
  IN_PROGRESS: "in_progress",
  DONE: "done",
};

export const AvailableTaskStatuses = Object.values(TaskStatusEnum);
