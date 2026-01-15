import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useStudentStore } from '../../store/studentStore';
import { useRoadmapStore } from '../../store/roadmapStore';
import { PersonIcon, PlusIcon, Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import ConfirmationModal from '../../components/ConfirmationModal';
import type { User } from '../../types';

export default function CompanyStudents() {
  const { user } = useAuthStore();
  const { 
    studentProgress, 
    initializeStudents, 
    createStudent, 
    updateStudent, 
    deleteStudent,
    getStudentsByCompanyId,
  } = useStudentStore();
  const { getRoadmapByStudentId } = useRoadmapStore();
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    companyId: user?.companyId || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    initializeStudents();
  }, [initializeStudents]);

  const companyStudents = user ? getStudentsByCompanyId(user.companyId || '') : [];

  const handleAddStudent = async () => {
    setIsSubmitting(true);
    try {
      createStudent({
        ...formData,
        role: 'student',
      });
      setIsAddModalOpen(false);
      setFormData({ name: '', email: '', companyId: user?.companyId || '' });
    } catch (error) {
      console.error('Error adding student:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditStudent = async () => {
    if (!selectedStudent) return;
    setIsSubmitting(true);
    try {
      updateStudent(selectedStudent.id, formData);
      setIsEditModalOpen(false);
      setSelectedStudent(null);
      setFormData({ name: '', email: '', companyId: user?.companyId || '' });
    } catch (error) {
      console.error('Error updating student:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteStudent = () => {
    if (!selectedStudent) return;
    deleteStudent(selectedStudent.id);
    setIsDeleteModalOpen(false);
    setSelectedStudent(null);
  };

  const openEditModal = (student: User) => {
    setSelectedStudent(student);
    setFormData({
      name: student.name,
      email: student.email,
      companyId: student.companyId || user?.companyId || '',
    });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (student: User) => {
    setSelectedStudent(student);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="w-full animate-fade-in">
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold mb-2 text-text-primary">
              Our Students
            </h1>
            <p className="text-sm sm:text-base text-text-secondary">Manage and track company-sponsored students</p>
          </div>
          <Button
            variant="primary"
            onClick={() => setIsAddModalOpen(true)}
            showArrow
          >
            <PlusIcon className="w-4 h-4" />
            Add Student
          </Button>
        </div>
      </div>

      {companyStudents.length > 0 ? (
        <div className="space-y-6">
          {companyStudents.map((student, idx) => {
            const progress = studentProgress.find((p) => p.studentId === student.id);
            const roadmap = getRoadmapByStudentId(student.id);

            return (
              <div
                key={student.id}
                className="card p-4 sm:p-6 animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-brand-600 rounded-full flex items-center justify-center shadow-soft">
                      <span className="text-white font-semibold text-xl">{student.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-text-primary">{student.name}</h2>
                      <p className="text-text-secondary">{student.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(student)}
                      className="p-2 rounded-lg hover:bg-surface-tertiary text-text-tertiary hover:text-brand-600 transition-colors"
                    >
                      <Pencil1Icon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => openDeleteModal(student)}
                      className="p-2 rounded-lg hover:bg-error-light text-text-tertiary hover:text-error-dark transition-colors"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-text-secondary">Progress</span>
                    <span className="text-3xl font-semibold text-brand-600">
                      {progress?.completionPercentage || 0}%
                    </span>
                  </div>
                  <div className="w-full bg-surface-tertiary rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-brand-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${progress?.completionPercentage || 0}%` }}
                    />
                  </div>
                </div>

                {roadmap && (
                  <div className="mb-6 bg-surface-tertiary border border-border rounded-xl p-5">
                    <h3 className="font-semibold mb-2 text-text-primary">{roadmap.title}</h3>
                    <p className="text-sm text-text-secondary mb-4">{roadmap.description}</p>
                    <div className="flex gap-2 flex-wrap">
                      {roadmap.learningGoals.slice(0, 3).map((goal, idx) => (
                        <span
                          key={idx}
                          className="badge-brand"
                        >
                          {goal}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-surface-tertiary border border-border rounded-xl p-5">
                    <p className="text-sm font-medium text-text-secondary mb-2">Current Phase</p>
                    <p className="text-3xl font-semibold text-text-primary">Phase {progress?.currentPhase || 1}</p>
                    <p className="text-xs text-text-tertiary mt-1">
                      {roadmap?.phases.find((p) => p.order === progress?.currentPhase)?.title || 'Foundation'}
                    </p>
                  </div>
                  <div className="bg-surface-tertiary border border-border rounded-xl p-5">
                    <p className="text-sm font-medium text-text-secondary mb-2">Tasks Completed</p>
                    <p className="text-3xl font-semibold text-text-primary">
                      {progress?.completedTasks || 0} / {progress?.totalTasks || 0}
                    </p>
                    <p className="text-xs text-text-tertiary mt-1">Total tasks</p>
                  </div>
                  <div className="bg-surface-tertiary border border-border rounded-xl p-5">
                    <p className="text-sm font-medium text-text-secondary mb-2">Last Activity</p>
                    <p className="text-lg font-semibold text-text-primary">
                      {progress?.lastActivity
                        ? new Date(progress.lastActivity).toLocaleDateString()
                        : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card text-center py-12 sm:py-16">
          <PersonIcon className="w-20 h-20 mx-auto mb-6 text-text-tertiary" />
          <h2 className="text-2xl font-semibold mb-3 text-text-primary">No Students Found</h2>
          <p className="text-text-secondary mb-6">
            Students sponsored by your company will appear here
          </p>
          <Button
            variant="primary"
            onClick={() => setIsAddModalOpen(true)}
            showArrow
          >
            <PlusIcon className="w-4 h-4" />
            Add Your First Student
          </Button>
        </div>
      )}

      {/* Add Student Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setFormData({ name: '', email: '', companyId: user?.companyId || '' });
        }}
        title="Add New Student"
        size="md"
      >
        <form onSubmit={(e) => { e.preventDefault(); handleAddStudent(); }} className="space-y-5">
          <div>
            <label className="label">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter student's full name"
              className="input"
              required
            />
          </div>
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter student's email"
              className="input"
              required
            />
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsAddModalOpen(false);
                setFormData({ name: '', email: '', companyId: user?.companyId || '' });
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              loading={isSubmitting}
              showArrow
            >
              Add Student
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Student Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedStudent(null);
          setFormData({ name: '', email: '', companyId: user?.companyId || '' });
        }}
        title="Edit Student"
        size="md"
      >
        <form onSubmit={(e) => { e.preventDefault(); handleEditStudent(); }} className="space-y-5">
          <div>
            <label className="label">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter student's full name"
              className="input"
              required
            />
          </div>
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter student's email"
              className="input"
              required
            />
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsEditModalOpen(false);
                setSelectedStudent(null);
                setFormData({ name: '', email: '', companyId: user?.companyId || '' });
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              loading={isSubmitting}
              showArrow
            >
              Update Student
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedStudent(null);
        }}
        onConfirm={handleDeleteStudent}
        title="Delete Student"
        message={`Are you sure you want to delete ${selectedStudent?.name}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
}
