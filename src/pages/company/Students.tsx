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
    <div className="p-6 animate-fade-in">
      <div className="mb-8 slide-up">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
              Our Students
            </h1>
            <p className="text-text-muted text-lg">Manage and track company-sponsored students</p>
          </div>
          <Button
            variant="primary"
            onClick={() => setIsAddModalOpen(true)}
            showArrow
          >
            <PlusIcon className="w-5 h-5" />
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
                className="card slide-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-xl">{student.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold text-text-primary">{student.name}</h2>
                      <p className="text-text-muted">{student.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(student)}
                      className="icon-button-primary"
                    >
                      <Pencil1Icon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => openDeleteModal(student)}
                      className="icon-button hover:bg-error/10 hover:text-error"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-text-muted">Progress</span>
                    <span className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                      {progress?.completionPercentage || 0}%
                    </span>
                  </div>
                  <div className="w-full bg-bg-tertiary rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-accent h-full rounded-full transition-all duration-500"
                      style={{ width: `${progress?.completionPercentage || 0}%` }}
                    />
                  </div>
                </div>

                {roadmap && (
                  <div className="mb-6 bg-gradient-soft border border-border rounded-xl p-5">
                    <h3 className="font-semibold mb-2 text-lg text-text-primary">{roadmap.title}</h3>
                    <p className="text-sm text-text-muted mb-4">{roadmap.description}</p>
                    <div className="flex gap-2 flex-wrap">
                      {roadmap.learningGoals.slice(0, 3).map((goal, idx) => (
                        <span
                          key={idx}
                          className="badge-primary px-3 py-1.5 text-xs font-medium"
                        >
                          {goal}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-soft border border-border rounded-xl p-5">
                    <p className="text-sm text-text-muted mb-2 font-semibold">Current Phase</p>
                    <p className="text-3xl font-bold text-text-primary">Phase {progress?.currentPhase || 1}</p>
                    <p className="text-xs text-text-muted mt-1 font-medium">
                      {roadmap?.phases.find((p) => p.order === progress?.currentPhase)?.title || 'Foundation'}
                    </p>
                  </div>
                  <div className="bg-gradient-soft border border-border rounded-xl p-5">
                    <p className="text-sm text-text-muted mb-2 font-semibold">Tasks Completed</p>
                    <p className="text-3xl font-bold text-text-primary">
                      {progress?.completedTasks || 0} / {progress?.totalTasks || 0}
                    </p>
                    <p className="text-xs text-text-muted mt-1 font-medium">Total tasks</p>
                  </div>
                  <div className="bg-gradient-soft border border-border rounded-xl p-5">
                    <p className="text-sm text-text-muted mb-2 font-semibold">Last Activity</p>
                    <p className="text-lg font-bold text-text-primary">
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
        <div className="card text-center py-16 slide-up">
          <PersonIcon className="w-20 h-20 mx-auto mb-6 text-text-muted" />
          <h2 className="text-2xl font-semibold mb-3 text-text-primary">No Students Found</h2>
          <p className="text-text-muted mb-6">
            Students sponsored by your company will appear here
          </p>
          <Button
            variant="primary"
            onClick={() => setIsAddModalOpen(true)}
            showArrow
          >
            <PlusIcon className="w-5 h-5" />
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
            <label className="input-label">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter student's full name"
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="input-label">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter student's email"
              className="input-field"
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
              showArrow
            >
              {isSubmitting ? 'Adding...' : 'Add Student'}
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
            <label className="input-label">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter student's full name"
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="input-label">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter student's email"
              className="input-field"
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
              showArrow
            >
              {isSubmitting ? 'Updating...' : 'Update Student'}
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

