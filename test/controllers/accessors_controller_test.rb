require 'test_helper'

class AccessorsControllerTest < ActionController::TestCase
  setup do
    @accessor = accessors(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:accessors)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create accessor" do
    assert_difference('Accessor.count') do
      post :create, accessor: { code: @accessor.code, friend_id: @accessor.friend_id, garage_id: @accessor.garage_id }
    end

    assert_redirected_to accessor_path(assigns(:accessor))
  end

  test "should show accessor" do
    get :show, id: @accessor
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @accessor
    assert_response :success
  end

  test "should update accessor" do
    patch :update, id: @accessor, accessor: { code: @accessor.code, friend_id: @accessor.friend_id, garage_id: @accessor.garage_id }
    assert_redirected_to accessor_path(assigns(:accessor))
  end

  test "should destroy accessor" do
    assert_difference('Accessor.count', -1) do
      delete :destroy, id: @accessor
    end

    assert_redirected_to accessors_path
  end
end
